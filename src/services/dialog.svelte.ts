export interface input {
  title: string;
  description: string;
  values: {
    [key: string]: {
      type: string;
      label: string;
      value: string;
      regex?: RegExp;
      error?: boolean;
      errorMessage?: string;
    };
  };
}

export interface output {
  cancelled: boolean;
  values: {
    [key: string]: string;
  };
}

class DialogServiceG {
  input: input = {title:"",description:"",values:{}};
  promiseResolve: (value: output | PromiseLike<output>) => void= ()=>{};
  showDialog: boolean = $state(false);

  requestDialog(input: input): Promise<output> {
    this.input = input;
    this.showDialog = true;
    return new Promise((resolve) => {
      this.promiseResolve = resolve;
    });
  }
}

export let DialogService = new DialogServiceG()