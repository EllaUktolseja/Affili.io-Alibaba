import pandas as pd


# LOAD DATA (Load once at startup)

df_products = pd.read_csv("data/shopify_trending_products_2025.csv")
df_users = pd.read_csv("data/synthetic_ecommerce_data.csv")


# PARSE PRICE RANGE
def parse_price_range(price_str):
    if pd.isna(price_str):
        return None, None

    price_str = str(price_str).replace("$", "").strip()

    if "-" in price_str:
        parts = price_str.split("-")
        return float(parts[0]), float(parts[1])
    else:
        price = float(price_str)
        return price, price


# Buat kolom Price_Min dan Price_Max
df_products[['Price_Min', 'Price_Max']] = df_products['Price_Range_USD'].apply(
    lambda x: pd.Series(parse_price_range(x))
)

# CALCULATE INCOME FUNCTION
# Perbaikan pada fungsi calculate_potential_income di BE
def calculate_potential_income(user_id: int, product_name: str):
    user_data = df_users[df_users['User_ID'] == user_id]
    if user_data.empty:
        return {"error": "User tidak ditemukan"}

    # Ambil CTR dan CR asli milik user tersebut dari CSV
    user_cr = float(user_data['Conversion_Rate (%)'].values[0]) 
    user_ctr = float(user_data['CTR (%)'].values[0])

    product_matches = df_products[
        df_products['Product_Name'].str.contains(product_name, case=False, na=False)
    ]
    if product_matches.empty:
        return {"error": "Produk tidak ditemukan"}

    product = product_matches.iloc[0]
    
    # Kirim BASELINE data ke frontend
    return {
        "user_id": user_id,
        "product_name": product['Product_Name'],
        "base_ctr": user_ctr, 
        "base_cr": user_cr,   
        "price_min": float(product['Price_Min']),
        "price_max": float(product['Price_Max']),
        "avg_price": float((product['Price_Min'] + product['Price_Max']) / 2)
    }

def calculate_opportunity_score(ctr, cr, estimated_sales, income_max):

    CTR_IDEAL = 3
    CR_IDEAL = 3
    SALES_IDEAL = 5
    INCOME_IDEAL = 20

    ctr_score = min((ctr / CTR_IDEAL) * 100, 100)
    cr_score = min((cr / CR_IDEAL) * 100, 100)
    sales_score = min((estimated_sales / SALES_IDEAL) * 100, 100)
    income_score = min((income_max / INCOME_IDEAL) * 100, 100)

    opportunity_score = (
        ctr_score * 0.25 +
        cr_score * 0.25 +
        sales_score * 0.20 +
        income_score * 0.20
    )

    return round(opportunity_score, 2)


