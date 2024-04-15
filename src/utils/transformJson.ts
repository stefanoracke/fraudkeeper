import { ClaimDataI, DamageType } from "../models/ClaimData.interface";

export function transformExposure(data: {
    "Cobertura afectada": DamageType[];
    "#": string[];
    "FechaOcurrencia": string[];
    "Motor": string[];
    "Chasis": string[];
    "Concepto": string[];
    "Asegurado": string[];
    "Entidad": string[];
}): ClaimDataI[] {
    const claimData: ClaimDataI[] = [];
    for (let i = 0; i < data["Cobertura afectada"].length; i++) {
        claimData.push({
            id: data['#'][i],
            damageType: data["Cobertura afectada"][i],
            asegurado: data["Asegurado"][i],
            date: data["FechaOcurrencia"][i],
            engine: data["Motor"][i] || "",
            chassis: data["Chasis"][i],
            concept: data["Concepto"][i],
            entity: data["Entidad"][i],
        });
    }
    return claimData;
}
export function transformPolicy(data: {
    "Cobertura afectada": DamageType[];
    "#": string[];
    "FechaOcurrencia": string[];
    "Motor": string[];
    "Chasis": string[];
    "DominioChasisMotorCobertura afectada": string[];
    "Concepto": string[];
    "Asegurado": string[]; // Not used in the transformation (optional)
    "Entidad": string[];
}): ClaimDataI[] {
    const claimData: ClaimDataI[] = [];
    for (let i = 0; i < data["Cobertura afectada"].length; i++) {
        claimData.push({
            id: data['#'][i],
            damageType: data["Cobertura afectada"][i],
            date: data["FechaOcurrencia"][i],
            engine: data["Motor"][i] || "", // Handle empty engine values
            domain_chasis_engine: data["DominioChasisMotorCobertura afectada"][i],
            chassis: data["Chasis"][i],
            concept: data["Concepto"][i],
            entity: data["Entidad"][i],
        });
    }
    return claimData;
}

export function returnJson(data: ClaimDataI[]) {
    const untransformedData: {
        "Cobertura afectada": DamageType[];
        "#": string[];
        "FechaOcurrencia": string[];
        "Motor": string[];
        "Chasis": string[];
        "DominioChasisMotorCobertura afectada": string[];
        "Concepto": string[];
        "Asegurado": string[]; // Not used in the transformation (optional)
        "Entidad": string[];
    } = {
        "Cobertura afectada": [],
        "#": [],
        "FechaOcurrencia": [],
        "Motor": [],
        "Chasis": [],
        "DominioChasisMotorCobertura afectada": [],
        "Concepto": [],
        "Asegurado": [], // Not used in the transformation (optional)
        "Entidad": [],
    };

    for (const item of data) {
        untransformedData["Cobertura afectada"].push(item.damageType);
        untransformedData["#"].push(item.id.toString());
        untransformedData["FechaOcurrencia"].push(item.date);
        untransformedData["Motor"].push(item.engine || "");
        untransformedData["Chasis"].push(item.chassis);
        if (item.domain_chasis_engine)
            untransformedData["DominioChasisMotorCobertura afectada"].push(item.domain_chasis_engine);
        if (item.asegurado)
            untransformedData["Asegurado"].push(item.asegurado);
        untransformedData["Concepto"].push(item.concept);
        untransformedData["Entidad"].push(item.entity);
    }

    return untransformedData;
}

export async function getJsonData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);

    }
}