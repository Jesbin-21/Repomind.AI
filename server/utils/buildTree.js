export function buildTree(paths) {

    const tree = {};

    paths.forEach((path) => {

        const folders = path.split("/");

        let current = tree;

        folders.forEach((folder) => {

            if (!current[folder]) {
                current[folder] = {};
            }

            current = current[folder];

        });

    });

    return tree;
}