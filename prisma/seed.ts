import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Roles
  const agentRole = await prisma.role.create({
    data: {
      name: 'agent',
      createdBy: 1,
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      createdBy: 1,
    },
  });

  const managerRole = await prisma.role.create({
    data: {
      name: 'manager',
      createdBy: 1,
    },
  });

  // Create PosteRoles
  const posteRoles = [
    {
      posteId: 1, // Assume this is the ID for a specific poste (e.g., Director)
      roleId: agentRole.id,
      createdBy: 1,
    },
    {
      posteId: 2, // Assume this is the ID for another poste (e.g., Driver)
      roleId: managerRole.id,
      createdBy: 1,
    },
    {
      posteId: 3, // Assume this is the ID for another poste (e.g., Admin)
      roleId: adminRole.id,
      createdBy: 1,
    },
  ];

  for (const posteRole of posteRoles) {
    await prisma.posteRoles.create({ data: posteRole });
  }

  // Create Users
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      email: 'agent1@agent.com',
      phone: '1234567890',
      password: 'password123',
      isActive: true,
      posteId: 1,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 1,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'jane.smith',
      email: 'agent2@agent.com',
      phone: '1234567891',
      password: 'password123',
      isActive: true,
      posteId: 1,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 2,
    },
    {
      firstName: 'James',
      lastName: 'Brown',
      username: 'james.brown',
      email: 'agent3@agent.com',
      phone: '1234567892',
      password: 'password123',
      isActive: true,
      posteId: 1,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 3,
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alice.johnson',
      email: 'manager1@manager.com',
      phone: '1234567893',
      password: 'password123',
      isActive: true,
      posteId: 2,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 4,
    },
    {
      firstName: 'Bob',
      lastName: 'White',
      username: 'bob.white',
      email: 'manager2@manager.com',
      phone: '1234567894',
      password: 'password123',
      isActive: true,
      posteId: 2,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 5,
    },
    {
      firstName: 'Charlie',
      lastName: 'Black',
      username: 'charlie.black',
      email: 'admin1@admin.com',
      phone: '1234567895',
      password: 'password123',
      isActive: true,
      posteId: 3,
      agenceId: 1,
      createdBy: 1,
      companyId: 1,
      employeeId: 6,
    },
  ];

  for (const user of users) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { password, ...userWithoutPassword } = user;

    await prisma.user.create({
      data: { ...userWithoutPassword, password: hashedPassword },
    });
  }
}

main()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
