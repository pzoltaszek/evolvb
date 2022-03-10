let TableMap = (() => {
    let tableMap = new Map(),

        createTableMap = ({ width, height }) => {
            tableMap = new Map();
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    tableMap.set(String(i) + String(j), {
                        last: '',
                        actual: '',
                    });
                }
            }
        },

        getTableMap = () => {
            return tableMap;
        },

        setTableMapPosition = (pos, value) => {
            if (pos) {
                let record = tableMap.get(pos);
                tableMap.set(pos, {
                    last: record.actual,
                    actual: value
                });
            }
        },

        getTableMapPosition = (pos) => {
            return tableMap.get(pos);
        }

    return {
        createTableMap: createTableMap,
        getTableMap: getTableMap,
        setTableMapPosition: setTableMapPosition,
        getTableMapPosition: getTableMapPosition
    }
})();

export default TableMap;