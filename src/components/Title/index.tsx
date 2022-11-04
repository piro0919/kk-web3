export type TitleProps = {
  title?: string;
};

function Title({ title }: TitleProps): JSX.Element {
  return <title>{`${title ? `${title} - ` : ""}kk-web`}</title>;
}

export default Title;
