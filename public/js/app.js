class TimersDashboard extends React.Component { // this will own state for Timer Data

  state = { // this is possible, again, due to babel's transform-class-properties
    timers: [
      {
        title: 'Go for a run',
        project: 'Gym chores',
        id: uuid.v4(),
        elapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        title: 'Bake lasagna',
        project: 'Kitchen Chores',
        id: uuid.v4(),
        elapsed: 1273998,
        runningSince: null,
      }
    ]
  }
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList 
            timers={this.state.timers}
          />
          <ToggleableTimerForm
            isOpen={true} // when open, the form is being displayed
          />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer)=> (
      <EditableTimer
        key={timer.id}
        id={timer.id} // preparing to communicate up via calling a function and passing the ID up
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
      />
    ));
    return (
      <div id="timers">
        {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component { // will manage state of its timer edit form
  state = {
    editFormOpen: false,
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm 
          id={this.props.id}
          title={this.props.title} 
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer 
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || '', // either it passes down existing prop, or it creates a timer so the string is empty
    project: this.props.project || '',
  };

  handleTitleChange = (e) => { // e represents "event object"
    this.setState({ title: e.target.value });
  };

  handleProjectChange = (e) => {
    this.setState( { project: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id, // undefined for creates, since no id exists yet
      title: this.state.title,
      project: this.state.project,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input 
                type="text" 
                value={this.state.title} 
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="field">
              <label>Project</label>
              <input 
                type="text" 
                value={this.state.project} 
                onChange={this.handleProjectChange}
              />
            </div>
            <div className="ui two bottom attached buttons">
              <button 
                className="ui basic blue button"
                onClick={this.handleSubmit}
              >
                {submitText} {/* Update or Create, depending on ternary, above */}
              </button>
              <button 
                className="ui basic red button"
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component { // will manage state of its own form visibility

  state = {
    isOpen: false,
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false })
  };

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm 
          onFormSubmit={this.handleFormSubmit} // passing functions in as props
          onFormClose={this.handleFormClose}   // is totally normal
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button 
            className='ui basic button icon'
            onClick={this.handleFormOpen} // causes component to re-render, then, since it's true, it returns the above!
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed); // in helpers.js
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">
            {this.props.title}
          </div>
          <div className="meta">
            {this.props.project}
          </div>
          <div className="center aligned description">
            <h2>
              {elapsedString}
            </h2>
          </div>
        </div>
        <div className="extra content">
          <span className="right floated edit icon">
            <i className="trash icon" />
          </span>
        </div>
        <div className="ui bottom attached blue basic button">
          Start
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);