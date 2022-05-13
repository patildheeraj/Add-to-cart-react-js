import { Navbar, Container, Nav, NavLink, Table } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import React, { useState, useEffect } from "react";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DLT } from "../redux/actions/action";

const Header = () => {
  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [price, setPrice] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(open);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const del = (id) => {
    console.log(id);
    dispatch(DLT(id));
  };

  const total = () => {
    let price1 = 0;
    getData.map((ele) => {
      price1 = ele.price * ele.qnty + price1;
    });
    setPrice(price1);
  };
  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <Link to="/" className="text-decoration-none text-light mx-3 bold">
            Add to Cart
          </Link>
          <Nav className="me-auto">
            <Link to="/" className="text-decoration-none text-light">
              Home
            </Link>
          </Nav>
          <Badge badgeContent={getData.length} color="primary">
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <Link to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                alt="Food"
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </Link>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹ {e.price}</p>
                            <p>Quantity :{e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => del(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => del(e.id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 22 }}>Your Cart is Empty!!</p>
              <img
                src="./cart.gif"
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
