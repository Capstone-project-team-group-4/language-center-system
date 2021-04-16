// Import package members section:
import React, { ReactElement } from "react";
import { Pagination } from "react-bootstrap";

interface PagingSectionProps {
    pageIndex: number;
    pageSize: number;
    totalRowCount: number;
    goToPage (destinationPageIndex: number): void;
}

export function PagingSection (props: PagingSectionProps): ReactElement {
    
    // Variables declaration:
    let totalNumberOfPage: number;
    let pagingFirst: ReactElement | undefined;
    let leftEllipsis: ReactElement | undefined;
    let pagingItem1: ReactElement | undefined;
    let pagingItem2: ReactElement | undefined;
    let pagingItem3: ReactElement | undefined;
    let pagingItem4: ReactElement | undefined;
    let rightEllipsis: ReactElement | undefined;
    let pagingLast: ReactElement | undefined;

    totalNumberOfPage = Math.ceil (props.totalRowCount / props.pageSize);
    if (props.pageIndex > 0){
        pagingFirst =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (0);
                        }
                    }
                >
                    {1}
                </Pagination.Item>
            </React.Fragment>;
    }
    if (props.pageIndex > 3){
        leftEllipsis =
            <React.Fragment>
                <Pagination.Ellipsis />
            </React.Fragment>;
    }
    if (props.pageIndex > 2){
        pagingItem1 =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (props.pageIndex - 2);
                        }
                    }
                >
                    {props.pageIndex - 1}
                </Pagination.Item>
            </React.Fragment>;
    }
    if (props.pageIndex > 1){
        pagingItem2 =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (props.pageIndex - 1);
                        }
                    }
                >
                    {props.pageIndex}
                </Pagination.Item>
            </React.Fragment>;
    }
    if (props.pageIndex < (totalNumberOfPage - 2)){
        pagingItem3 =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (props.pageIndex + 1);
                        }
                    }
                >
                    {props.pageIndex + 2}
                </Pagination.Item>
            </React.Fragment>;
    }
    if (props.pageIndex < (totalNumberOfPage - 3)){
        pagingItem4 =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (props.pageIndex + 2);
                        }
                    }
                >
                    {props.pageIndex + 3}
                </Pagination.Item>
            </React.Fragment>;
    }
    if (props.pageIndex < (totalNumberOfPage - 4)){
        rightEllipsis =
            <React.Fragment>
                <Pagination.Ellipsis />
            </React.Fragment>;
    }
    if (props.pageIndex < (totalNumberOfPage - 1)){
        pagingLast =
            <React.Fragment>
                <Pagination.Item
                    onClick = {
                        () => {
                            props.goToPage (totalNumberOfPage - 1);
                        }
                    }
                >
                    {totalNumberOfPage}
                </Pagination.Item>
            </React.Fragment>;
    }

    return (
        <Pagination>
            {pagingFirst}
            {leftEllipsis}
            {pagingItem1}
            {pagingItem2}
            <Pagination.Item 
                active = {true}
            >
                {props.pageIndex + 1}
            </Pagination.Item>
            {pagingItem3}
            {pagingItem4}
            {rightEllipsis}
            {pagingLast}
        </Pagination>
    );
}