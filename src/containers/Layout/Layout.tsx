import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "containers/Admin/AdminNavbar";
import Sidebar from "containers/Admin/Sidebar";
import { useAuth } from "contexts/AuthContextProvider";

const OrgRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    layout: "",
  },
  {
    path: "/org-items",
    name: "Items",
    icon: "ni ni-archive-2 text-primary",
    layout: "",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-chart-pie-35 text-primary",
    layout: "",
  },
  {
    path: "/org-vendors",
    name: "Vendors",
    icon: "ni ni-chart-pie-35 text-primary",
    layout: "",
  },
  {
    path: "/settings/reset-password",
    name: "Settings",
    icon: "ni ni-calendar-grid-58 text-primary",
    layout: "",
  },
];
const VendorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    layout: "",
  },
  {
    path: "/rfq",
    name: "RFQ",
    icon: "ni ni-app text-primary",
    layout: "",
  },
  {
    path: "/settings/reset-password",
    name: "Settings",
    icon: "ni ni-calendar-grid-58 text-primary",
    layout: "",
  },
];
const BuyerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    layout: "",
  },
  // {
  //   collapse: true,
  //   name: "Buyer",
  //   icon: "ni ni-align-left-2 text-default",
  //   state: "buyerCollapse",
  //   views: [
  //     {
  //       path: "/rfq",
  //       name: "RFQ",
  //       miniName: "T",
  //       layout: "",
  //     },
  //   ],
  // },
  {
    path: "/org-vendors",
    name: "Vendors",
    icon: "ni ni-chart-pie-35 text-primary",
    layout: "",
  },
  {
    path: "/rfq",
    name: "RFQ",
    icon: "ni ni-app text-primary",
    layout: "",
  },
  {
    path: "/comparison",
    name: "Comparison",
    icon: "ni ni-map-big text-primary",
    layout: "",
  },
  {
    path: "/settings/reset-password",
    name: "Settings",
    icon: "ni ni-calendar-grid-58 text-primary",
    layout: "",
  },
];

const Layout = (props: any) => {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [routes, setRoutes] = useState<any[]>([]);
  const location = useLocation();
  const { accountProfile } = useAuth();

  useEffect(() => {
    if (accountProfile && accountProfile.id) {
      if (accountProfile.userAccessType === "organization") {
        setRoutes(OrgRoutes);
      } else if (accountProfile.userAccessType === "vendor") {
        setRoutes(VendorRoutes);
      } else if (accountProfile.userAccessType === "buyer") {
        setRoutes(BuyerRoutes);
      }
    } else {
      window.location.reload();
    }
  }, [accountProfile]);

  const getBrandText = () => {
    if (routes.length > 0) {
      for (let i = 0; i < routes.length; i++) {
        if (
          location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return "Brand";
  };

  const toggleSidenav = () => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar
          theme={"light"}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText()}
        />
        {props.children}
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
};

export default Layout;
