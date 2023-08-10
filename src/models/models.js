import { User } from './User.js'
import { Subject } from './Subject.js'
import { Task } from './Task.js'


User.hasMany(Subject, {foreignKey: 'userId', onDelete: 'cascade'})
Subject.belongsTo(User, {foreignKey: 'userId'})
Subject.hasMany(Task, {foreignKey: 'subjectId', onDelete: 'cascade'})
Task.belongsTo(Subject, {foreignKey: 'subjectId'})

export { User, Subject, Task }
