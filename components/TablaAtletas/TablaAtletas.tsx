import React from "react";
import styles from "./TablaAtletas.module.css";

type Atleta = {
    name: string,
    identification: string,
    rol: boolean,
};

type Props = {
    atletas: Atleta[];
};

const TablaAtletas: React.FC<Props> = ({ atletas }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>Nombre</th>
                    <th className={styles.th}>Cedula</th>
                </tr>
            </thead>
            <tbody>
                {atletas.map((atleta) => (
                    <tr key={atleta.identification}>
                        <td className={styles.td}>{atleta.name}</td>
                        <td className={styles.td}>{atleta.identification}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaAtletas;