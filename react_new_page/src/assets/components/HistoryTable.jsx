import "../styles/additional-styles/historyTable.css";

const HistoryTable = () => {
  // Temporary static data (later comes from API / state)
  const reports = [
    {
      id: 1,
      time: "5 min",
      name: "Janez Novak",
      image: "http://api.randomuser.me/portraits/thumb/men/1.jpg",
      description:
        "Redar na Ulici Sončnega Bulevarda, v bližini mestnega parka",
    },
    {
      id: 2,
      time: "15 min",
      name: "Alenka Kovač",
      image: "http://api.randomuser.me/portraits/thumb/men/2.jpg",
      description:
        "Redar na Ulici Javorja, v bližini stare knjižnice",
    },
    {
      id: 3,
      time: "1h",
      name: "Bojan Simič",
      image: "http://api.randomuser.me/portraits/thumb/men/3.jpg",
      description:
        "Redar na Ulici Hrasta, v bližini mestnega nakupovalnega centra",
    },
  ];

  return (
    <div className="content-wrap" style={{ marginTop: "20px" }}>
      <div className="row rowTable">
        <div className="col-sm-12" style={{ marginTop: "20px" }}>
          <div id="siteClose" className="nest">
            {/* HEADER */}
            <div className="title-alt">
              <h6>
                <span className="fontawesome-globe"></span>&nbsp;Zadnja
                obvestila
              </h6>
            </div>

            {/* BODY */}
            <div id="site" className="body-nest" style={{ minHeight: "296px" }}>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        {/* TIME / USER */}
                        <td className="armada-devider">
                          <div className="armada">
                            <span style={{ background: "#65c3df" }}>
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                style={{ marginRight: 6 }}
                              >
                                <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
                              </svg>
                              User
                            </span>
                            <p>
                              <span className="entypo-gauge"></span>
                              &nbsp;{report.time} <i>ago</i>
                            </p>
                          </div>
                        </td>

                        {/* AVATAR */}
                        <td className="driver-devider">
                          <img
                            className="armada-pic img-circle"
                            src={report.image}
                            alt={report.name}
                          />
                          <h3>{report.name}</h3>
                        </td>

                        {/* DESCRIPTION */}
                        <td>
                          <p>{report.description}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* END BODY */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
