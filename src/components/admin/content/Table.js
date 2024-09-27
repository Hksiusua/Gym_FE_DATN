import "./Table.scss";
import ReactPaginate from "react-paginate";
const Table = (props) => {
  const { ListUser } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {ListUser.length > 0 ? (
          ListUser.map((user, index) => (
            <tr key={`table-users-${index}`}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="col-md-12 col- row">
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-success  designSizeButton"
                      onClick={() => {
                        props.handleClickBtnView(user);
                        console.log("ádsadasd", user);
                      }}
                    >
                      View
                    </button>
                  </div>
                  <div className="col-md-3 ">
                    <button
                      type="button"
                      className="btn btn-warning  designSizeButton"
                      onClick={() => {
                        props.handleClickBtnUpdate(user);
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-md-3 ">
                    <button
                      type="button"
                      className="btn btn-danger designSizeButton"
                      onClick={() => {
                        props.handleClickBtnDelete(user);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
