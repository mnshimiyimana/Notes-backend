const defineNoteModel = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "Server-generated UUID primary key",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
        comment: "Note title",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Note content",
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment:
          "Client-generated ID for sync purposes and duplicate prevention",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "When the note was created client-side",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "When the note was last updated",
      },
      syncedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "When the note was last synced with the server",
      },
    },
    {
      tableName: "notes",
      indexes: [
        {
          unique: true,
          fields: ["clientId"],
          name: "notes_client_id_idx",
        },
      ],
    }
  );

  return Note;
};

export default defineNoteModel;
