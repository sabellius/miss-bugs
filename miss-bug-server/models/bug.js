import fs from 'fs';
import PDFDocument from 'pdfkit';

const DATA_FILE = 'data/bugs.json';
const BACKUP_FILE = 'data/bugs.json.backup';

class Bug {
  constructor(id, title, severity, createdAt) {
    this._id = id;
    this.title = title;
    this.severity = severity;
    this.createdAt = createdAt;
  }

  static loadData() {
    try {
      // Create backup if it doesn't exist
      if (!fs.existsSync(BACKUP_FILE)) {
        if (fs.existsSync(DATA_FILE)) {
          fs.copyFileSync(DATA_FILE, BACKUP_FILE);
        }
      }

      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      this.bugs = JSON.parse(data);
    } catch (error) {
      console.error('Error loading bugs:', error);
    }
  }

  static saveData() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.bugs, null, 2), 'utf-8');
      console.log('✅ Bugs saved to file');
    } catch (error) {
      console.error('Error saving bugs:', error);
    }
  }

  static findAll() {
    return this.bugs;
  }

  static findById(id) {
    return this.bugs.find(bug => bug._id === id);
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
    console.log('🚀 ~ Bug ~ update ~ bug:', bug);
    if (bug) {
      bug.title = data.title;
      bug.severity = data.severity;
      return bug;
    }
    return null;
  }

  static delete(id) {
    const index = this.bugs.findIndex(bug => bug.id === parseInt(id));
    if (index !== -1) {
      this.bugs.splice(index, 1);
      return true;
    }
    return false;
  }

  static toPdf() {
    const doc = new PDFDocument();

    doc.text('Bugs Report');
    doc.moveDown();

    this.bugs.forEach(bug => {
      doc.fontSize(10);
      doc.text(`ID: ${bug._id}`);
      doc.text(`Title: ${bug.title}`);
      doc.text(`Severity: ${bug.severity}`);
      doc.text(`Created: ${new Date(bug.createdAt).toLocaleDateString()}`);
      doc.moveDown();
    });

    return doc;
  }
}

Bug.loadData();

export default Bug;
