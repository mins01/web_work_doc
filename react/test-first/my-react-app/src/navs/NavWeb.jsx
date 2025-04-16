import { Link } from "react-router-dom";

import './NavWeb.css';

export default function NavWeb({ children }){
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/home2">Home2</Link>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}