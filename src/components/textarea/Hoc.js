import compose from "recompact/compose";
import withHandlers from "recompact/withHandlers";
import Textarea from "./Component";

/* Wrap the standard component in a HOC that'll handle passing the expected output to
anything that requires it. This makes things a lot cleaner as obviously you don't want to
be accessing and messing around with events outside of this component. */
export default compose(
  withHandlers({
    onChange: ({ value, onChange }) => e => onChange(e.currentTarget.value)
  })
)(Textarea);
