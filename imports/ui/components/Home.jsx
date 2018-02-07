import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';

import { getUserTimeline } from '/imports/api/twitter/methods';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      userTimeline: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    getUserTimeline.call({ userName: this.userName.value }, (error, userTimeline) => {
      this.setState({ userTimeline });
    });
  }
  render() {
    const { userTimeline } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={elem => { this.userName = elem; }} />
          <input type="submit" value="Get timeline" />
        </form>
        {userTimeline ? userTimeline.map(timeline => <div key={timeline.id}>{timeline.text}</div>) : null}
      </div>
    );
  }
}
