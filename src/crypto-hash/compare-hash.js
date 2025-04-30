// Check if the password entered by the user matches the saved hash

const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Помилка при хешуванні пароля:', error);
        throw error;
    }
};


const verifyPassword = async (enteredPassword, savedHash) => {
    try {
        const result = await bcrypt.compare(enteredPassword, savedHash);
        return result;
    } catch (error) {
        console.error('Помилка при перевірці пароля:', error);
        throw error;
    }
};


const testPassword = async () => {
    try {
        const password = 'userPassword123';

        const savedHash = await generateHash(password);
        console.log('Згенерований хеш:', savedHash);

        const enteredPassword = 'userPassword123';

        const isMatch = await verifyPassword(enteredPassword, savedHash);
        console.log(isMatch ? 'Пароль збігається!' : 'Пароль не збігається.');
    } catch (error) {
        console.error('Помилка при тестуванні модуля:', error);
    }
};


testPassword();
