class TimersDashboard extends React.component {
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

class EditableTimerList extends React.component {
  render() {
    return (
      <div id="timers">
        <EditableTimer
          title='Learn React'
          project='Web Learning'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimer 
          title='Learn Extreme Ironing'
          project='Domestic'
          elapsed='389095'
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}

class EditableTimer extends React.component {
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
