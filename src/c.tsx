import * as React from 'react'
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
interface IProps {
  [propName: string]: any;
}
class IntegerStep extends React.Component<IProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: true,
    };
  }
  render() {
    let {checked} = this.state
    const { getFieldProps } = this.props.form;
    return <List.Item
    extra={<Switch
      {...getFieldProps('Switch7', {
        initialValue: true,
        valuePropName: 'checked',
      })}
      platform="ios"
    />}
  >Style for iOS</List.Item>
  }
}
// ReactDOM.render(</><IntegerStep/><=/>=, document.getElementById("root"));
const Se = createForm()(IntegerStep);
export default Se