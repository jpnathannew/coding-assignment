import React, { PureComponent } from "react";
import { getUsers, getTodos } from "./service";

export default class App extends PureComponent {
  domains = [
    "all",
    ".biz",
    ".tv",
    ".net",
    ".org",
    ".ca",
    ".info",
    ".me",
    ".io",
  ];
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUser: [],
      todos: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const users = await getUsers();
    const todos = await getTodos();
    this.setState({ users, todos });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const addedCount = this.state.users?.map((user, i) => {
        const countValue = {
          count: this.state.todos.filter((todo) => todo.userId === user.id)
            .length,
        };
        return {
          ...user,
          ...countValue,
        };
      });
      this.setState({ users: addedCount });
    }
  }

  listUsers(users) {
    return (
      <ul>
        {users?.map((user) => {
          return (
            <li key={user.name}>
              {user.name} has completed {user.count} todos
            </li>
          );
        })}
      </ul>
    );
  }

  handleChange(e) {
    if (e?.target?.value) {
      const selectedValue = e.target.value;
      const filteredOutput = this.state.users?.filter((item, i) => {
        const domainName = item?.email.split("@")[1];
        const domainNamewithExtn = domainName.split(".");
        if (domainNamewithExtn.length > 1) {
          domainNamewithExtn?.shift();
        }
        const tldDomain = `.${domainNamewithExtn.join(".")}`;
        return tldDomain === selectedValue;
      });
      this.setState({ filteredUser: filteredOutput });
    }
  }

  renderDropDown() {
    return (
      <select onChange={this.handleChange}>
        {this.domains?.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { users, filteredUser } = this.state;
    return (
      <>
        {this.renderDropDown()}
        {this.listUsers(filteredUser.length ? filteredUser : users)}
      </>
    );
  }
}
