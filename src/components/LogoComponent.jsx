function LogoComponent(props) {
    return (
        <div className="logo d-flex mt-2" onClick={props.clickHangle}>
          <span className="h2 m-0 text-success">T</span>
          <span className="h3 m-0 text-danger">i</span>
          <span className="h3 m-0 text-info">c</span>
          <span className="h3 m-0 text-success">-</span>
          <span className="h3 m-0 text-danger">T</span>
          <span className="h3 m-0 text-info">a</span>
          <span className="h3 m-0 text-success">c</span>
          <span className="h3 m-0 text-danger">-</span>
          <span className="h3 m-0 text-info">T</span>
          <span className="h3 m-0 text-success">o</span>
          <span className="h3 m-0 text-danger">e</span>
        </div>
    );
}

export default LogoComponent;
