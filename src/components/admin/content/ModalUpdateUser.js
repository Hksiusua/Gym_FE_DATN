import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalCreateUser.scss";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putUpdateUser } from "../../service/apiService";
import _ from "lodash";

const ModalViewUser = (props) => {
  const { show, onHide, dataUpdate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    // console.log("runnn useefffect", dataUpdate);
    if (!_.isEmpty(dataUpdate)) {
      //update state
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setPassword(dataUpdate.password);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]); // the each run data change so effect run again

  const handleClose = () => {
    onHide();
    setEmail("");
    setUsername("");
    setPassword("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };

  const handleUpdateUser = async () => {
    let res = await putUpdateUser(dataUpdate.id, username, role, image);
    // console.log(res.data); // this data own axios

    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      console.log(res);
      props.setCurrentPage(1);
      props.fetchListUserWithPaginate(1); // Directly use fetchListUser here
    }

    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  // console.log("check dataupdate:", props.dataUpdate);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="form-control"
            value={email}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            UserName
          </label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            className="form-control"
            value={username}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Roles
        </label>
        <select
          onChange={(event) => setRole(event.target.value)}
          className="form-select"
          aria-label="Default select example"
          value={role}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="mb-3 mt-3">
          <label className="form-label FormatImage" htmlFor="labelUpload">
            <FontAwesomeIcon icon={faPlus} className="fa-plus-icon" />
            Repository image
          </label>
          <input
            type="file"
            id="labelUpload"
            hidden
            onChange={handleUploadImage}
          />
          <div className="repositoryImage">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>Preview Image</span>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewUser;
