require('dotenv').config()
const express = require("express")
const cors = require("cors")
const {Pool} = require("pg")
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get("/api/projects", async (req, res) => {
    try {
        const limitParam = req.query.limit ? parseInt(req.query.limit, 10) : null;
        const statusParam = req.query.status;
        const params = [];
        const whereClauses = [];

        if (statusParam && statusParam.toLowerCase() !== 'all') {
            params.push(statusParam.toLowerCase());
            whereClauses.push(`LOWER(COALESCE(pd.status, 'Funded')) = $${params.length}`);
        }

        const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        let queryText = `
            SELECT 
                p.id_intial,
                p.category,
                p.title,
                p.funding_amount,
                p.description,
                p.has_preview,
                COALESCE(pd.status, 'Funded') AS status,
                COALESCE(
                    json_agg(u.avatar_url ORDER BY u.id) FILTER (WHERE u.avatar_url IS NOT NULL),
                    '[]'::json
                ) AS avatars
            FROM initialprojects p
            LEFT JOIN project_details pd ON p.id_intial = pd.project_id
            LEFT JOIN project_users pu ON p.id_intial = pu.project_id
            LEFT JOIN users u ON pu.user_id = u.id
            ${whereSql}
            GROUP BY p.id_intial, p.category, p.title, p.funding_amount, p.description, p.has_preview, pd.status
            ORDER BY p.id_intial ASC
        `;

        if (limitParam && !isNaN(limitParam) && limitParam > 0) {
            params.push(limitParam);
            queryText += ` LIMIT $${params.length}`;
        }

        const result = await pool.query(queryText, params);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
});

app.get("/api/projects/:id", async (req, res) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        const queryText = `
            SELECT 
                p.id_intial,
                p.category,
                p.title,
                p.funding_amount,
                p.description,
                p.has_preview,
                pd.banner_url,
                COALESCE(pd.status, 'Funded') AS status,
                pd.project_site_url,
                pd.purpose,
                pd.execution,
                pd.payment_structure,
                pd.useful_links,
                pd.funding_transactions,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', u.id,
                            'name', u.name,
                            'avatar_url', u.avatar_url
                        ) ORDER BY u.id
                    ) FILTER (WHERE u.id IS NOT NULL),
                    '[]'::json
                ) AS team
            FROM initialprojects p
            LEFT JOIN project_details pd ON p.id_intial = pd.project_id
            LEFT JOIN project_users pu ON p.id_intial = pu.project_id
            LEFT JOIN users u ON pu.user_id = u.id
            WHERE p.id_intial = $1
            GROUP BY 
                p.id_intial, p.category, p.title, p.funding_amount, p.description, p.has_preview,
                pd.banner_url, pd.status, pd.project_site_url, pd.purpose, pd.execution, pd.payment_structure,
                pd.useful_links, pd.funding_transactions
        `;

        const result = await pool.query(queryText, [projectId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        const project = result.rows[0];

        if (typeof project.useful_links === 'string') {
            try {
                project.useful_links = JSON.parse(project.useful_links);
            } catch {
                project.useful_links = [];
            }
        }
        if (typeof project.funding_transactions === 'string') {
            try {
                project.funding_transactions = JSON.parse(project.funding_transactions);
            } catch {
                project.funding_transactions = [];
            }
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
});

app.get("/api/main", async (req, res) => {
    try {
        const limitParam = req.query.limit ? parseInt(req.query.limit, 10) : null;
        let queryText = `
            SELECT 
                p.id_intial,
                p.category,
                p.title,
                p.funding_amount,
                p.description,
                p.has_preview,
                COALESCE(pd.status, 'Funded') AS status,
                COALESCE(
                    json_agg(u.avatar_url ORDER BY u.id) FILTER (WHERE u.avatar_url IS NOT NULL),
                    '[]'::json
                ) AS avatars
            FROM initialprojects p
            LEFT JOIN project_details pd ON p.id_intial = pd.project_id
            LEFT JOIN project_users pu ON p.id_intial = pu.project_id
            LEFT JOIN users u ON pu.user_id = u.id
            GROUP BY p.id_intial, p.category, p.title, p.funding_amount, p.description, p.has_preview, pd.status
            ORDER BY p.id_intial ASC
        `;
        const params = [];
        if (limitParam && !isNaN(limitParam) && limitParam > 0) {
            params.push(limitParam);
            queryText += ` LIMIT $${params.length}`;
        }
        const result = await pool.query(queryText, params);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
});

app.post('/api/form', async (req, res) => {
    try {
        const {title, tag, date_text, sort_order, category} = req.body
        const result = await pool.query(
            'INSERT INTO query (title, tag, date_text, sort_order, category) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [title, tag, date_text, sort_order, category]
        )
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
