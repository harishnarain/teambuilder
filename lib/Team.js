class Team {
  constructor() {
    this.employees = [];
  }
  getEmployees = () => {
    return this.employees;
  };

  addEmployee = (employee) => {
    this.employees.push(employee);
  };
}

module.exports = Team;
