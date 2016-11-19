import {Injectable} from '@angular/core';

@Injectable()
export class StateService {
  private subscribed_states = {
    
  };

  getAllStates() {
    return this.subscribed_states;
  }

  addState(state) {
    if (state in this.subscribed_states) {
      return;
    }
    this.subscribed_states[state] = {}
  }

  clearState(state) {
    if (!(state in this.subscribed_states)) {
      return;
    }
    this.subscribed_states[state] = {}
  }

  editState(state, key, value) {
    this.addState(state);
    this.subscribed_states[state][key] = value;
  }

  getState(state) {
    this.addState(state);
    return this.subscribed_states[state];
  }

  clearAllStates() {
    this.subscribed_states = {};
  }
}