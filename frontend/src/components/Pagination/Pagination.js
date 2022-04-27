import React, { useState, useEffect } from "react";

//CSS
import "./Pagination.css";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
    const [counter, setCounter] = useState(1);
    const [numberOfButtons, setNumberOfButtons] = useState(
        Math.ceil(total / showPerPage)
    );

    // console.log("counter: " + counter);
    // console.log("number of buttons: " + Math.ceil((total / showPerPage)));
    // console.log("total:" + total);
    // console.log("spp:" + showPerPage);

    useEffect(() => {
        // console.log("Pagination useEffect");
        setNumberOfButtons(Math.ceil(total / showPerPage));
        setCounter(1);
    }, [total]);

    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value - showPerPage, value);
    }, [counter]);

    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1);
            } else {
                setCounter(counter - 1);
            }
        } else if (type === "next") {
            if (numberOfButtons === counter) {
                setCounter(counter);
            } else {
                setCounter(counter + 1);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination" key={numberOfButtons}>
                    <li className="page-item">
                        <a
                            className="page-link link-static link-static-text font-weight-bold"
                            onClick={() => onButtonClick("prev")}
                        >
                            &#10094;
                        </a>
                    </li>
                    {new Array(numberOfButtons).fill("").map((el, index) => (
                        <li className={`page-item ml-2 `} key={index}>
                            <a
                                className={`page-number page-link ${index + 1 === counter ? "text-white" : "text-dark"
                                    } font-weight-bold ${index + 1 === counter ? "bg-success" : "bg-light"
                                    }`}
                                onClick={() => setCounter(index + 1)}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className="page-item ml-2">
                        <a
                            className="page-link link-static link-static-text font-weight-bold"
                            onClick={() => onButtonClick("next")}
                        >
                            &#10095;
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
