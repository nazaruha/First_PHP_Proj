import {Oval} from "react-loader-spinner";
import React from "react";
import "./styles.scss";

interface OvalSpinnerProps {
    visibility: boolean
}

const OvalSpinner: React.FC<OvalSpinnerProps> = ({
    visibility = false
}) => {
    return (
        <>
            {visibility ? (
                <div className="my_spinner">
                    <div className="spinner">
                        <Oval
                            ariaLabel="loading-indicator"
                            height={80}
                            width={80}
                            strokeWidth={5}
                            strokeWidthSecondary={1}
                            color="#094cb0"
                            secondaryColor="#0d6efd"
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}

        </>
    )
}

export default  OvalSpinner;