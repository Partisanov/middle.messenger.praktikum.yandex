import Block from '../../utils/Block.ts';

interface IDialogProps {
  open: boolean;
}

type Refs = Record<string, never>;

export class Dialog extends Block<IDialogProps, Refs> {
  constructor(props: IDialogProps) {
    super(props);
  }

  protected render(): string {
    return `<dialog class="dialog" {{#if open}}open{{/if}}></dialog>`;
  }
}
