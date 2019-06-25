import { EventEmitter } from 'events'

class ViewEmitter extends EventEmitter {}

const viewEmitter = new ViewEmitter()

export default viewEmitter
