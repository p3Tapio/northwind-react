import React from "react";
import Request from 'react-http-request'; 

export class Md5 extends React.Component {
    render() {
        let url = "http://md5.jsontest.com/?text="+this.props.salattava;
        return (
            <Request url={url} method="get" accept="Application/json" verbose={false}>
                {
                    ({error, result, loading}) => {
                        if(loading) {
                            return <div>loading.....</div>;
                        } else if(result) {
                            return <div>{result.body.md5}</div>
                        } else if (error) {
                            return <div>{console.error()}</div>
                        }
                    }
                }
            </Request>
        )
    }
}