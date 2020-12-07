import React from "react";
import { Container, Row, Col } from "reactstrap";
import { productTilesMeta } from "./metaData";
import { useStyle } from "./style";

import { useNavigate } from "react-router-dom";

export const CoreProducts = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <Container className={classes.wrapper + " CoreProducts"} fluid={true}>
      <Row className={" product-row"} xs="1" sm="3" md="4" lg="6">
        {productTilesMeta.map((one) => {
          return (
            <Col
              key={one.productName}
              className={classes.customCol + " product-col"}
            >
              <div
                className={classes.productWrapper + " product-wrap"}
                onClick={(e) => {
                  e.preventDefault();
                  if (one.href !== undefined) {
                    navigate(one.href, {
                      state: { ...one.navigationProps },
                    });
                  }
                }}
              >
                <div className="product-icon">{one.productIcon}</div>
                <div className={classes.productName + " product-name"}>
                  {one.productName}
                </div>
                {Boolean(one.covidCovered) ? (
                  <span className={classes.productTag + " product-tag"}>
                    Covid-19 Covered
                  </span>
                ) : null}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
