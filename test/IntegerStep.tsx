import * as React from 'react'
import {observer, inject} from 'mobx-react'
import Stores from "./store";
@inject('Pubcli')
@observer
class IntegerStep extends React.Component<any, any> {
	Stores = Stores
	render() {
		console.log(this.props, 'Stores')
		let { changValue, youses } = this.props.Pubcli
		return <>
			<div>{youses}</div>

			<button onClick={() => {
				changValue()
			}}>change</button>

		</>
	}
}
export default IntegerStep