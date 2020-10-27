import React, { useState, useEffect } from 'react';
import { fetchUserOrders} from './../Utils';
import {TableRow, OrderDetails} from './../common-component';
export function RegularOrder(props) {

  const perPage = 10;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMoreShow, setLoadMoreShow] = useState(true);
  const [error, setError] = useState("");
  const [detailData, setDetailData] = useState(null);
  
  const setCurrentData = (responseData) => {
    if (responseData && responseData.length < perPage) {
      setLoadMoreShow(false);
    }
    let arrayData = [...data, ...responseData];
    setData(arrayData);
    setCount(arrayData.length);
  }

  const loadMore = () => {
    if (loading === false && loadMore){
      setLoading(true);
      fetchUserOrders(setLoading, setCurrentData, setError, count, perPage);
    }
  }

  useEffect(() => {
     fetchUserOrders(setLoading, setCurrentData, setError, count, perPage);
  }, []);

  return (
    <div className="content">
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Restaurant</th>
          <th scope="col">Username</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        { data.map( d => <TableRow key={d.id} data={d} setDetailData={setDetailData}> </TableRow> ) }     
      </tbody>
     </table>
     { detailData && <OrderDetails orderList={data} setOrderList={setData} data={detailData} isOwner={false} handleClose={() => setDetailData(null)} ></OrderDetails> }
      <div className="ml-5">
          { loadMoreShow && <button onClick={loadMore} className="btn btn-info ">Load more </button>}
            <div className="text-center">
              {error && <small className="text-danger"> {error}</small>} 
            </div>
      </div>
    </div>
  );
}
