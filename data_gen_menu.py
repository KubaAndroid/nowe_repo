import random
import codecs
import json

f = codecs.open("menu.txt", "w+", encoding="utf-8")

def get_img(dish):
    img = ""
    if(dish == "Soup"):
        img = random.choice(["/img/soup_1.jpg", "/img/soup_2.jpg", "/img/soup_3.jpg"])
    elif(dish == "Curry"):
        img = random.choice(["/img/curry_1.jpg", "/img/curry_2.jpg", "/img/curry_3.jpg"])
    elif(dish == "Stew"):
        img = random.choice(["/img/stew_1.jpg", "/img/stew_2.jpg", "/img/stew_3.jpg"])
    elif(dish == "Cake"):
        img = random.choice(["/img/cake_1.jpg", "/img/cake_2.jpg", "/img/cake_3.jpg"])
    elif(dish == "Teriyaki"):
        img = random.choice(["/img/teriyaki_1.jpg", "/img/teriyaki_2.jpg", "/img/teriyaki_3.jpg"])
    elif(dish == "Pie"):
        img = random.choice(["/img/pie_1.jpg", "/img/pie_2.jpg", "/img/pie_3.jpg"])
    elif(dish == "Steak"):
        img = random.choice(["/img/steak_1.jpg", "/img/steak_2.jpg", "/img/steak_3.jpg"])
    elif(dish == "Ribs"):
        img = random.choice(["/img/ribs_1.jpg", "/img/ribs_2.jpg", "/img/ribs_3.jpg"])
    return img


for i in range(60):
    rid = random.randint(1, 10000)
    f_name = random.choice(["Beef", "Carrot", "Chicken", "Duck", "Rabbit", "Vege", "Apple", "Brown"])
    s_name = random.choice(["Soup", "Curry", "Stew", "Cake", "Teriyaki", "Pie", "Steak", "Ribs"])
    img = get_img(s_name)
    kcal_100 = random.randint(1, 100)
    kcal_p = kcal_100 * 3
    carbs_100 = random.randint(1, 100)
    carbs_p = carbs_100 * 3
    fats_100 = random.randint(1, 100)
    fats_p = fats_100 * 3
    protein_100 = random.randint(1, 100)
    protein_p = protein_100 * 3
    dish_name = f_name + " " + s_name
    category = random.choice(["spicy", "vege", "no_lactose"])

    dish = {
        "id": i,
        "name": dish_name,
        "price": round(random.uniform(9.99, 88.88), 2),
        "description": dish_name + " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "img_url": img,
        "energy_value_per_100g": kcal_100,
        "energy_value_per_portion": kcal_p,
        "fats_per_100g": fats_100,
        "fats_per_portion": fats_p,
        "carbs_per_100g": carbs_100,
        "carbs_per_portion": carbs_p,
        "protein_per_100g": protein_100,
        "protein_per_portion": protein_p,
        "category": category
    }

    f.write(json.dumps(dish, indent=2))
f.close()

