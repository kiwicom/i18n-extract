"use strict";

/* eslint-disable */
var classNames = require('classnames');

define(['react', 'backbone', 'js/mixins/betelgeuse', 'jsx/lib/alert', 'i18n'], function (React, Backbone, BetelgeuseMixin, Alert, i18n) {
  var FollowButton = React.createClass({
    displayName: "FollowButton",
    propTypes: {
      isDisabled: React.PropTypes.bool
    },
    mixins: [BetelgeuseMixin],
    getDefaultProps: function getDefaultProps() {
      return {
        group: {},
        // Group object from api
        onClick: null,
        buttonText: i18n('follow'),
        buttonStyle: i18n('follow'),
        // Test the uniq filter
        onToggle: function onToggle() {},
        onFinished: function onFinished() {},
        silent: false,
        isDisabled: false,
        followType: 'group',
        followIds: [],
        isFollowing: false,
        trackLabel: 'N/A'
      };
    },
    getInitialState: function getInitialState() {
      return {
        hovered: false,
        changePending: false
      };
    },

    /**
     * When user has followed
     */
    joined: function joined() {
      this.app.setAlert(React.createElement(Alert, {
        type: "success"
      }, i18n('followed')));
      this.setState({
        changePending: false
      }); // Analytics tracking

      Backbone.trigger('analytics:trackEvent', 'Activity', 'Followed ' + this.props.followType, this.props.trackLabel);
    },

    /**
     * When user has unfollowed
     */
    left: function left() {
      this.app.setAlert(React.createElement(Alert, {
        type: "success"
      }, i18n('unfollowed')));
      this.setState({
        changePending: false
      });
    },

    /**
     * When this button is clicked lets toggle membership
     */
    handleClick: function handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      } else {
        if (this.state.changePending) {
          return;
        }

        if (!this.app.context.isActive()) {
          Backbone.trigger('interaction:inactive');
          return;
        }

        this.setState({
          changePending: true
        });
        var change = this.props.isFollowing ? this.ctx.unfollow(this.props.followType, this.props.followIds, this.props.silent).then(this.left).then(this.props.onUpdate) : this.ctx.follow(this.props.followType, this.props.followIds, this.props.silent).then(this.joined).then(this.props.onUpdate);
        change.then(function () {
          this.props.onToggle();
          this.props.onFinished(!this.props.isFollowing);
        }, this);
      }
    },

    /**
     * When the button is hovered
     */
    handleMouseEnter: function handleMouseEnter() {
      this.setState({
        hovered: true
      });
    },

    /**
     * When the button is no longer hovered
     */
    handleMouseLeave: function handleMouseLeave() {
      this.setState({
        hovered: false
      });
    },
    render: function render() {
      var props = this.props;
      var buttonStyle = props.buttonStyle;
      var isFollowing = props.isFollowing;
      var classes = {
        btn: true,
        'btn-success': buttonStyle === 'success',
        'btn-blank': buttonStyle === 'blank' || buttonStyle === 'fullWidth',
        'follow-full-width': buttonStyle === 'fullWidth',
        'icon--success': isFollowing && !this.state.hovered,
        'icon--danger': isFollowing && this.state.hovered,
        'icon-plus': !isFollowing,
        'icon-ok': isFollowing && !this.state.hovered,
        'icon-cancel': isFollowing && this.state.hovered
      };
      var followingText = this.state.hovered ? i18n('unfollow') : i18n('following');
      return React.createElement("button", {
        className: classNames(props.className, classes),
        disabled: props.isDisabled,
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, isFollowing ? followingText : props.children || props.buttonText);
    }
  });
  return FollowButton;
});