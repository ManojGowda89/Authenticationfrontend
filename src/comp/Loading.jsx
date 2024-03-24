

export default function Loading(){
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0D6EFD", 
      };
    return (
        <div style={styles}>
          <center>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </center>
        </div>
      );
}