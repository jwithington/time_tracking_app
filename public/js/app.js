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

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  };
  
  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t), // this appends the new timer to our timers array
    });
  };
  
  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => { // the call is evaluated and then the property timers is set to the result
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, { // returns news object with timer's updated attributes; this helps us to treat state as immutable
          title: attrs.title,
          project: attrs.project,
        });
        } else {
          return timer;
        }
      }),
    });
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId) // returns new array with the one matching timerId removed
    });
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList 
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick} // pass down handleTrashClick as a prop
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
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
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick} // proxies the function to get the props
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

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true })
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm 
          id={this.props.id}
          title={this.props.title} 
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer 
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick} // proxies the function to give the id of deleted timer
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
    this.props.onFormSubmit(timer); // this is an object in TimerForm
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

  handleTrashClick = () => { // handles trash button click events
    this.props.onTrashClick(this.props.id); 
  };

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
          <div className="extra content">
            <span 
              className="right floated edit icon"
              onClick={this.props.onEditClick}
            >
              <i className="edit icon" />
            </span>
            <span 
              className="right floated trash icon"
              onClick={this.handleTrashClick} // this is how we wire the function to the button
            >
              <i className="trash icon" />
            </span>
          </div>
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