import fs from "fs";

class Bug {
  constructor(id, title, severity, createdAt) {
    this._id = id;
    this.title = title;
    this.severity = severity;
    this.createdAt = createdAt;
  }

  static load() {
    const data = fs.readFileSync("data/bugs.json", "utf-8");
    this.bugs = JSON.parse(data);
  }

  static findAll() {
    return this.bugs;
  }

  static findById(id) {
    return this.bugs.find((bug) => bug._id === parseInt(id));
  }

  static create(data) {
    const newBug = new Bug(
      this.bugs.length + 1,
      data.title,
      data.severity,
      data.createdAt
    );
    this.bugs.push(newBug);
    return newBug;
  }

  static update(id, data) {
    const bug = this.findById(id);
    if (bug) {
      bug.title = data.title || bug.title;
      bug.content = data.content || bug.content;
      bug.author = data.author || bug.author;
      return bug;
    }
    return null;
  }

  static delete(id) {
    const index = this.bugs.findIndex((bug) => bug.id === parseInt(id));
    if (index !== -1) {
      this.bugs.splice(index, 1);
      return true;
    }
    return false;
  }
}

Bug.load();

export default Bug;
