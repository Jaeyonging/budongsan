import axios from 'axios'
let service_Key = import.meta.env.VITE_SERVICE_KEY

export async function GetHouseData(code: string, date: string) {
    return axios.get(`/api/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${service_Key}&pageNo=1&numOfRows=10&LAWD_CD=${code}&DEAL_YMD=${date}`);
}