const express = require("express");
const pool = require("../database/db");

class MainController {

//Survey Services
  async getSurveyDetails(request, response) {
    await pool.query(
      "SELECT * FROM csu_survey ORDER BY id ASC",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }

  async getSurveyDetailsId(request, response) {
    const id = parseInt(request.params.id);

    await pool.query(
      "SELECT * FROM csu_survey WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
  
  async createSurvey(request, response) {
    const currentDate = new Date();
    const {floor, time,computers,studyCarols,softSeating,tables,others,createdon,updatedon } = request.body;

    await pool.query(
      "INSERT INTO csu_survey (floor,time,computers,studyCarols,softSeating,tables,others,createdon,updatedon) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9)RETURNING *",
      [floor,time,computers,studyCarols,softSeating,tables,others,currentDate,currentDate],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(JSON.stringify(results.rows) + "...");
        response.status(201).send(`User added with ID: ${JSON.stringify(results.rows)}`);
      }
    );
  }
  async updateSurvey(request, response) {
    const currentDate = new Date();
    const id = parseInt(request.params.id);
    const { floor, time, computers, studyCarols, softSeating, tables, others } = request.body;

    await pool.query(
        "UPDATE csu_survey SET time = $1, computers = $2, studyCarols = $3, softSeating = $4, tables = $5, others = $6, createdon = $7, updatedon = $8, floor = $9 WHERE id = $10",
        [time, computers, studyCarols, softSeating, tables, others, currentDate, currentDate, floor, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
}


  // async updateSurvey(request, response) {
  //   const currentDate = new Date();
  //   const id = parseInt(request.params.id);
  //   const {floor,time,computers,studyCarols,softSeating,tables,others,createdon,updatedon } = request.body;

  //   await pool.query(
  //     "UPDATE csu_survey SET time = $1, computers = $2 , studyCarols=$3 ,softSeating = $4, tables=$5 ,others=$6,createdon=$7,updatedon=$8 ,floor=$9 WHERE id = $10",
  //     [time,computers,studyCarols,softSeating,tables,others,currentDate,currentDate,id,floor],
  //     (error, results) => {
  //       if (error) {
  //         throw error;
  //       }
  //       response.status(200).send(`User modified with ID: ${id}`);
  //     }
  //   );
  // }

  async deleteSurvey(request, response) {
    const id = parseInt(request.params.id);

    await pool.query(
      "DELETE FROM csu_survey WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
      }
    );
  }

  //User Service
  async getUsers(request, response) {
    await pool.query(
      "SELECT * FROM users ORDER BY id ASC",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }

  async getUserById(request, response) {
    const id = parseInt(request.params.id);

    await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }

  async createUser(request, response) {
    const { name, email } = request.body;

    await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(JSON.stringify(results) + "...");
        response.status(201).send(`User added with ID: ${results.insertId}`);
      }
    );
  }

  async updateUser(request, response) {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  }

  async deleteUser(request, response) {
    const id = parseInt(request.params.id);

    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
      }
    );
  }


}

const controller = new MainController();
module.exports = controller;
