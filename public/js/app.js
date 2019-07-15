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
          editFormOpen={true}
        />
      </div>
    );
  }
}
