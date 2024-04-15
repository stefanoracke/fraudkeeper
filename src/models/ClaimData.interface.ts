export type DamageType = "DAÑO PARCIAL" | "DAÑO TOTAL" | "ROBO TOTAL";


export interface ClaimDataI {
    id: number | string,
    damageType: DamageType,
    date: string,
    engine: string,
    domain_chasis_engine?: string,
    asegurado?:string,
    chassis: string,
    concept: string,
    entity: string,
}