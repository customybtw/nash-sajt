CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','editor','viewer') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content LONGTEXT,
    meta_title VARCHAR(255),
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(300),
    hero_image VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    meta_title VARCHAR(255),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    billing_cycle ENUM('monthly','yearly','commission') DEFAULT 'monthly',
    description TEXT,
    features JSON,
    seo_title VARCHAR(255),
    seo_description VARCHAR(300),
    is_active TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    summary TEXT,
    icon VARCHAR(100),
    seo_title VARCHAR(255),
    seo_description VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    consent TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    body LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description LONGTEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    inventory INT DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    employment_type VARCHAR(100),
    description LONGTEXT,
    requirements LONGTEXT,
    meta_title VARCHAR(255),
    meta_description VARCHAR(300),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    cover_image VARCHAR(500),
    meta_title VARCHAR(255),
    meta_description VARCHAR(300),
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS domain_hosting (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(255) NOT NULL,
    registrar VARCHAR(255),
    hosting_provider VARCHAR(255),
    renewal_date DATE,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS integrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    integration_type VARCHAR(100) NOT NULL,
    settings JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS custom_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    configuration JSON,
    is_enabled TINYINT(1) DEFAULT 1
);

INSERT INTO pricing_plans (name, price, billing_cycle, description, features, seo_title, seo_description)
VALUES
('40€ Plan', 40.00, 'monthly', 'Essential website package for individuals and small teams.', JSON_ARRAY('Responsive design', 'SEO optimization', 'Content management'), '40 Euro Website Plan', 'Essential website plan with responsive design and SEO'),
('70€ Plan', 70.00, 'monthly', 'Full featured website with marketing tools.', JSON_ARRAY('All features from 40€ plan', 'Request forms', 'Newsletter manager', 'Advanced analytics'), '70 Euro Website Plan', 'Full featured website plan for growing businesses'),
('100€ Plan', 100.00, 'monthly', 'High profile website with e-commerce and payments.', JSON_ARRAY('Custom design', 'Integrated e-shop', 'Payment gateway integration', 'Advanced admin panel'), '100 Euro Website Plan', 'High profile e-commerce ready website plan'),
('Free / Individual Plan', 0.00, 'commission', 'Revenue share model for e-commerce projects.', JSON_ARRAY('Custom commission agreement', 'E-commerce consultation', 'Ongoing optimization'), 'Free Website Plan', 'Commission based plan for online stores')
ON DUPLICATE KEY UPDATE price = VALUES(price);
