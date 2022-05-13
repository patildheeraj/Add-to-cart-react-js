import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/actions/action";

const CardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const getData = useSelector((state) => state.cartReducer.carts);
  const compare = () => {
    let cdata = getData.filter((e) => {
      return e.id == id;
    });
    setData(cdata);
  };
  useEffect(() => {
    compare();
  }, [id]);

  const send = (item) => {
    dispatch(ADD(item));
  };

  const del = (id) => {
    dispatch(DLT(id));
    history("/");
  };
  const removeOne = (item) => {
    console.log(item);
    dispatch(REMOVE(item));
  };
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Detail Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((e) => {
              return (
                <>
                  <div className="items_img">
                    <img src={e.imgdata} alt="Item" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong>: {e.rname}
                          </p>
                          <p>
                            <strong>Price</strong>: ₹ {e.price}
                          </p>
                          <p>
                            <strong>Dishes</strong>: {e.address}
                          </p>
                          <p>
                            <strong>Total</strong>: ₹ {e.price * e.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                e.qnty <= 1
                                  ? () => del(e.id)
                                  : () => removeOne(e)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{e.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(e)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {e.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review : </strong>
                            <span>{e.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove : </strong>
                            <span>
                              <i
                                className="fas fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => del(e.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDetails;
