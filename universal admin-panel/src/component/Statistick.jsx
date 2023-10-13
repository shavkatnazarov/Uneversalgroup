import './statistik.css'
import {useEffect, useState} from "react";
import {Api} from "../connection/Api";
import {BaseConfig} from "../connection/BaseConfig";
import {Loading} from "./Loading";

export const Statistick = () => {
    const [stat, setStat] = useState({})
    const [loading, setLoading] = useState(false)
    const getStatisti = async () => {
        try {

            const res = await BaseConfig.doGet(Api.statistics)
            setStat(res.data)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStatisti()
    }, [])
    const statArr = [
        {name: "Bo'limlar", statistika: stat.categorySize, icon: 'fas fa-chart-bar', about: "bo'limlar haqida"},
    ]
    return (
        <>
            {loading ? (
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"/>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.3.1/css/all.min.css"
                          rel="stylesheet"/>
                    <div className="main-content">
                        <div className="header bg-gradient-primary">
                            <div className="container-fluid">
                                <h2 className="mb-2 text-white">Stats Card</h2>
                                <div className="header-body">
                                    <div className="row">
                                        {statArr.map(item => (
                                            <div className="col-xl-3 col-lg-6">
                                                <div className="card card-stats mb-4 mb-xl-0">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col">
                                                                <h5 className="card-title text-uppercase text-muted mb-0">{item.name}</h5>
                                                                <span
                                                                    className="h2 font-weight-bold mb-0">{item.statistika}</span>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div
                                                                    className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                                                    <i className={item.icon}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-success mr-2"><i
                                                            className="fa fa-arrow-up"/> </span>
                                                            <span className="text-nowrap">{item.about}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    )
}