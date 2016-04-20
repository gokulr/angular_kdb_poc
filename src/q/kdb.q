/ Steps to start this up
/ 1) start a q session
/ 2) load this q file - q "C:\Users\gr12611\Desktop\JS world\angular_kdb\src\q\kdb.q"
/ 3) set a port - \p 2271
/ 4) set the home page with html file - .h.HOME: "C:\\Users\\gr12611\\Desktop\\JS world\\angular_kdb"
/ 5) Webbrowser has now been started on kdb

/
Documentation Here
\
.reporting.oldzph:.z.ph; 
.reporting.queryTypeSep:"?";

/
Documentation Here
\
.reporting.getQueryType:{[sep;uri]
  :$[sep in uri;first sep vs uri;0#""];
 };

/
Documentation Here
\
.reporting.getQuery:{[sep;uri]
  :$[sep in uri;(1+uri?sep)_uri;0#""];
 };

/
Documentation Here
\
.reporting.zphHandlers.ipc:{[uri;header]                                            / Define a handler for "ipc" query type
  query:.reporting.getQuery[.reporting.queryTypeSep]uri;
  errHndlr:{:"Error executing query in ipc handler. Error was: ", x};
  :.h.hy[`txt;raze string -8!@[get;query;errHndlr]];
 };

/
Documentation Here
\
.reporting.zphHandlers:` _ .reporting.zphHandlers;

/
Documentation Here
\
.z.ph:.reporting.ph:{[x]
  uri:.h.uh x 0;
  header: x 1;

  queryType:`$.reporting.getQueryType[.reporting.queryTypeSep]uri;
  if[queryType in key .reporting.zphHandlers;
    :.reporting.zphHandlers[queryType][uri;header];
  ];

  :.reporting.oldzph[x];
 };


/
connect to a kdb data source and compute a simple vwap for a symbol
\
h:hopen`:host_name:port
getMinuteVwap:{  :30#h"select vwap: size wavg price, avg_px:max price by time.minute from trade where sym=`2823.HK";  }
