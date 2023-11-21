/**
 * @class Todo
 *
 * Manages the data of the application.
 */

export class Todo {
    id: string;
    text: string;
    complete: boolean;
  
    constructor({ text, complete = false }: { text: string; complete?: boolean } = { text: '' }) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }
  
    private uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
  }
  