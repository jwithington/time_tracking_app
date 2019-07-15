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
