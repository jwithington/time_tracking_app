class TimersDashboard extends React.Component {
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList />
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
    return (
      <div id="timers">
        <EditableTimer
          title='Learn React'
          project='Web Learning'
          elapsed='8986300' // in milliseconds because thats what JS uses for time  
          runningSince={null}
          editFormOpen={true}
        />
        <EditableTimer 
          title='Learn Extreme Ironing'
          project='Domestic'
          elapsed='389095'
          runningSince={null}
          editFormOpen={false}
        />
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  render() {
    
    if (this.props.editFormOpen) {
      return (
        <TimerForm 
          title={this.props.title} // both of these mean that the current value is pulled in when editing
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
  render() {
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input type="text" defaultValue={this.props.title} />
            </div>
            <div className="field">
              <label>Project</label>
              <input type="text" defaultValue={this.props.project} />
            </div>
            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button">
                {submitText} {/* Update or Create, depending on ternary, above */}
              </button>
              <button className="ui basic red button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button className="ui basic button icon">
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